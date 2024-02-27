'use client';

import Container from '@/components/ui/container';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { customerAccountSchema } from '@/validation/schemas';

type Props = {};

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  // cartData: string
}

const Register = ({}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(customerAccountSchema) });
  const [submiting, setSubmiting] = useState(false);
  const [response, setResponse] = useState('');
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    try {
      setSubmiting(true);
      //   const cartData = JSON.stringify(cart);
      data = { ...data };
      const req = await fetch('/api/customers/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const { message } = await req.json();

      if (req.status === 200) {
        await signIn('credentials', {
          redirect: false,
          ...data,
        });

        router.push('account');
      } else {
        setResponse(message);
      }
    } catch (error) {
      setSubmiting(false);
      console.error(error);
    }
  };

  return (
    <main className="grid h-full place-items-center">
      <Container>
        <Card className={cn('mx-auto w-[380px]')}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className={cn('text-center')}>My Account</CardTitle>
              <CardDescription className={cn('text-center')}>
                Sign in
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-2">
              <Input
                type="text"
                placeholder="First Name"
                {...register('firstName')}
              />
              <Input
                type="text"
                placeholder="Last Name"
                {...register('lastName')}
              />
              <Input type="email" placeholder="Email" {...register('email')} />
              <Input
                type="password"
                id={'password'}
                placeholder="Password"
                {...register('password')}
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                {...register('confirmPassword')}
              />
            </CardContent>
            <CardFooter className={cn('flex flex-col space-y-2')}>
              <Button className="w-full" type="submit">
                Register{' '}
              </Button>
              <span>
                Already have an account?{' '}
                <Link href="/sign-in">
                  <Button variant={'link'}>Sign In</Button>
                </Link>
              </span>
            </CardFooter>
          </form>
        </Card>
      </Container>
    </main>
  );
};

export default Register;
