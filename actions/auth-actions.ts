'use server';
import { hashUserPassword } from '@/lib/hash';
import { createUser } from '@/lib/user';
import { redirect } from 'next/navigation';

interface FormErrors {
    email?: string;
    password?: string;
}

export async function signup(prevState, formData) {
    const email = formData.get('email');
    const password = formData.get('password');

    let errors: FormErrors = {};

    if (!email.includes('@')) {
        errors.email = 'Please enter a valid email address';
    }

    if (password.trim().length < 8) {
        errors.password = 'Password must be at least 8 characters long';
    }
    // store it in the database (create a new user)

    if ((Object.keys(errors).length > 0)) {
        return {
            errors,
        }
    }

    const hashedPassword = hashUserPassword(password);
    try {
        createUser(email, hashedPassword);

    } catch (error) {
        if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            return {
                errors: {
                    email: 'It seems like an accouint for the chosen email already exists.',
                }
            }
        }
        throw error;
    }

    redirect('/training')
}