import { useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import { useRouter } from 'expo-router';
import { onboarding } from '@/constants';

const Welcome = () => {
    const router = useRouter();
    const swiperRef = useRef<Swiper>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <SafeAreaView className="flex h-full items-center justify-between">
            <TouchableOpacity
                onPress={() => {
                    router.replace('/(auth)/sign-up');
                }}
                className="w-full flex justify-end items-end p-5"
            >
                <Text className="text-black text-md font-JakartaBold">Skip</Text>
            </TouchableOpacity>

            <Swiper
                ref={swiperRef}
                loop={false}
                dot={<View className="w-8 h-1 bg-[#E2E8F0] rounded-full" />}
                activeDot={<View className="w-8 h-1 bg-[#0286FF] rounded-full" />}
                onIndexChanged={index => setActiveIndex(index)}
            >
                {onboarding.map(item => (
                    <View>
                        <Text>{item.title}</Text>
                    </View>
                ))}
            </Swiper>
        </SafeAreaView>
    );
};

export default Welcome;
