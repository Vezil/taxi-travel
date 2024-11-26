import { useState } from 'react';
import { ScrollView, View, Image, Text } from 'react-native';
import { Link } from 'expo-router';
import { icons, images } from '@/constants';
import InputField from '@/components/InputField';
import CustomButton from '@/components/CustomButton';
import OAuth from '@/components/OAuth';
import { useSignUp } from '@clerk/clerk-expo';

const SignUp = () => {
    const { isLoaded, signUp, setActive } = useSignUp();
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [verification, setVerification] = useState({ state: 'default', error: '', code: '' });

    const onSignUpPress = async () => {
        if (!isLoaded) {
            return;
        }

        try {
            await signUp.create({
                emailAddress: form.email,
                password: form.password
            });

            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

            setVerification({ ...verification, state: 'pending' });
        } catch (error: any) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(error, null, 2));
        }
    };

    const onPressVerify = async () => {
        if (!isLoaded) {
            return;
        }

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code: verification.code
            });

            if (completeSignUp.status === 'complete') {
                await setActive({ session: completeSignUp.createdSessionId });
                setVerification({ ...verification, state: 'success' });
            } else {
                console.error(JSON.stringify(completeSignUp, null, 2));
                setVerification({ ...verification, error: 'Verification failed.', state: 'failed' });
            }
        } catch (error: any) {
            console.error(JSON.stringify(error, null, 2));
            setVerification({ ...verification, error: error.errors[0].longMessage, state: 'failed' });
        }
    };

    return (
        <ScrollView className="flex-1 bg-white">
            <View className="flex-1 bg-white">
                <View>
                    <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />

                    <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
                        Create Your Account
                    </Text>
                </View>

                <View className="p-5">
                    <InputField
                        label="Name"
                        placeholder="Enter name"
                        icon={icons.person}
                        value={form.name}
                        onChangeText={value => {
                            setForm({ ...form, name: value });
                        }}
                    />

                    <InputField
                        label="Email"
                        placeholder="Enter email"
                        icon={icons.email}
                        value={form.email}
                        onChangeText={value => {
                            setForm({ ...form, email: value });
                        }}
                    />

                    <InputField
                        label="Password"
                        placeholder="Enter password"
                        icon={icons.lock}
                        secureTextEntry={true}
                        value={form.password}
                        onChangeText={value => {
                            setForm({ ...form, password: value });
                        }}
                    />

                    <CustomButton title="Sign Up" onPress={onSignUpPress} className="mt-6" />

                    <OAuth />

                    <Link href="/sign-in" className="text-lg text-center text-general-200 mt-10">
                        <Text>Already have an account? </Text>
                        <Text className="text-primary-500">Log In</Text>
                    </Link>
                </View>

                {/* TODO: Verification Modal */}
            </View>
        </ScrollView>
    );
};

export default SignUp;
