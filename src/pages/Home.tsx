import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  FlatList
} from 'react-native'

import { Button } from '../components/Button'
import { SkillCard } from '../components/SkillCard'

interface ISkillData {
  id: string
  name: string
  date?: Date
}

export function Home() {
  const [newSkill, setNewSkill] = useState('')
  const [mySkills, setMySkills] = useState<ISkillData[]>([])
  const [greetings, setGreetings] = useState('')

  function handleAddNewSkill() {
    const data = {
      id: String(new Date().getTime()),
      name: newSkill
    }

    setMySkills(oldSkills => [...oldSkills, data])
    setNewSkill('')
  }

  function handleRemoveSkill(id: string) {
    setMySkills(oldSkills => oldSkills.filter(skill => skill.id !== id))
  }

  useEffect(() => {
    const currentHour = new Date().getHours()

    if (currentHour < 12) {
      setGreetings('Good morning')
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreetings('Good afternoon')
    } else {
      setGreetings('Good night')
    }
  }, [])

  return (
    <View style={styles.container}>
      <Text testID="welcome" style={styles.title}>
        Welcome, Nelson
      </Text>

      <Text style={styles.greettings}>
        {greetings}
      </Text>

      <TextInput
        testID="input-new-skill"
        style={styles.input}
        placeholder="New Skill"
        placeholderTextColor="#555"
        value={newSkill}
        onChangeText={setNewSkill}
      />

      <Button
        testID="button-add"
        title="Add"
        onPress={handleAddNewSkill}
      />

      <Text style={[styles.title, { marginVertical: 50 }]}>
        My Skills
      </Text>

      <FlatList
        testID="flat-list-skills"
        data={mySkills}
        keyExtractor={item => item.id}
        keyboardShouldPersistTaps="never"
        renderItem={({ item: skill }) => (
          <SkillCard
            skill={skill.name}
            onPress={() => handleRemoveSkill(skill.id)}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingHorizontal: 30,
    paddingVertical: 30
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#1f1e25',
    color: '#fff',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7
  },
  greettings: {
    color: '#fff'
  }
})