import { useState } from 'react';
import { ScrollView, View, Image, Text } from 'react-native';
import { icons, images } from '@/constants';
import InputField from '@/components/InputField';

const SignUp = () => {
    const [form, setForm] = useState({ name: '', email: '', passowrd: '' });

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
                </View>
            </View>
        </ScrollView>
    );
};

export default SignUp;
