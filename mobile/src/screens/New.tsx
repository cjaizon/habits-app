import { useState } from "react"
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { Feather } from "@expo/vector-icons";

import { BackButton } from "../components/BackButton"
import { Checkbox } from "../components/Checkbox"
import colors from "tailwindcss/colors";
import { api } from "../lib/axios";

const avaliableWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']

export const New = () => {
    const [title, setTitle] = useState('')

    const [weekDays, setWeekDays] = useState<number[]>([])

    const handleToggleWeekDay = (weekDayIndex: number) => {
        if (weekDays.includes(weekDayIndex)) {
            setWeekDays(prevState => prevState.filter(weekDay => weekDay != weekDayIndex))
        } else {
            setWeekDays(prevState => [...prevState, weekDayIndex])
        }
    }

    const handleCreateNewHabit = async () => {
        try {
            if (!title || weekDays.length === 0) {
                Alert.alert('Informações faltando', 'É necessário informar um título e escolher pelo menos 1 dia para criar um novo hábito!')
            } else {
                await api.post('/habits', { title, weekDays })

                setTitle('')
                setWeekDays([])

                Alert.alert('É isso aí', 'Novo hábito criado com sucesso!')
            }

        } catch (error) {
            Alert.alert('Ops', 'Não foi possível criar um novo hábito!')
            console.log(error);
        }
    }

    return (
        <View
            className="flex-1 bg-background px-8 pt-16"
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >

                <BackButton />
                <Text
                    className="mt-6 text-white font-extrabold text-3xl"
                >
                    Criar hábito
                </Text>
                <Text
                    className="mt-6 text-white font-semibold text-base"
                >
                    Qual  seu comprometimento?
                </Text>

                <TextInput
                    placeholder="Exercícios, domir bem, etc..."
                    placeholderTextColor={colors.zinc[500]}
                    className="h-12 pl-4 rounded-lg mt-3 bg-zinc-800 text-white border-2 border-zinc-600 focus:border-green-600"
                    onChangeText={setTitle}
                    value={title}
                />

                <Text className="font-semibold mt-4 mb-3 text-base text-white">
                    Qual a recorrência?
                </Text>

                {
                    avaliableWeekDays.map((weekDay, index) =>
                        <Checkbox
                            key={weekDay}
                            title={weekDay}
                            checked={weekDays.includes(index)}
                            onPress={() => handleToggleWeekDay(index)}
                        />
                    )
                }

                <TouchableOpacity
                    activeOpacity={0.7}
                    className='flex-row w-full h-14 items-center justify-center bg-green-600 rounded-md mt-6'
                    onPress={handleCreateNewHabit}
                >
                    <Feather
                        name='check'
                        size={20}
                        color={colors.white}
                    />
                    <Text
                        className="font-semibold text-base text-white ml-2"
                    >
                        Confirmar
                    </Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    )
}