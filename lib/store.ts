import { create } from "zustand"
import scholarsData from "@/data/scholars.json"
import topicsData from "@/data/topics.json"
import classesData from "@/data/classes.json"
import teachersData from "@/data/teachers.json"
import subjectsData from "@/data/subjects.json"
import lessonsData from "@/data/lessons.json"

interface Scholar {
  id: number
  name: string
  specialty: string
  location: string
}

interface Topic {
  id: number
  name: string
  description: string
}

interface Class {
  id: number
  scholarId: number
  topicId: number
  title: string
  description: string
  duration: number
  date: string
  location: string
  attendees: number
  additionalInfo: string
}

interface Teacher {
  id: number
  name: string
}

interface Subject {
  id: number
  name: string
}

interface Lesson {
  id: number
  teacherId: number
  subjectId: number
  title: string
  description: string
  duration: number
  date: string
}

interface IslamicKnowledgeStore {
  scholars: Scholar[]
  topics: Topic[]
  classes: Class[]
  teachers: Teacher[]
  subjects: Subject[]
  lessons: Lesson[]
  selectedScholar: number | null
  selectedTopic: number | null
  selectedTeacher: number | null
  selectedSubject: number | null
  setSelectedScholar: (scholarId: number | null) => void
  setSelectedTopic: (topicId: number | null) => void
  setSelectedTeacher: (teacherId: number | null) => void
  setSelectedSubject: (subjectId: number | null) => void
}

export const useIslamicKnowledgeStore = create<IslamicKnowledgeStore>((set) => ({
  scholars: scholarsData,
  topics: topicsData,
  classes: classesData,
  teachers: teachersData,
  subjects: subjectsData,
  lessons: lessonsData,
  selectedScholar: null,
  selectedTopic: null,
  selectedTeacher: null,
  selectedSubject: null,
  setSelectedScholar: (scholarId) => set({ selectedScholar: scholarId, selectedTopic: null }),
  setSelectedTopic: (topicId) => set({ selectedTopic: topicId }),
  setSelectedTeacher: (teacherId) => set({ selectedTeacher: teacherId, selectedSubject: null }),
  setSelectedSubject: (subjectId) => set({ selectedSubject: subjectId }),
}))

interface TeacherStore {
  teachers: Teacher[]
  subjects: Subject[]
  lessons: Lesson[]
  selectedTeacher: number | null
  selectedSubject: number | null
  setSelectedTeacher: (teacherId: number | null) => void
  setSelectedSubject: (subjectId: number | null) => void
}

export const useTeacherStore = create<TeacherStore>((set) => ({
  teachers: teachersData,
  subjects: subjectsData,
  lessons: lessonsData,
  selectedTeacher: null,
  selectedSubject: null,
  setSelectedTeacher: (teacherId) => set({ selectedTeacher: teacherId, selectedSubject: null }),
  setSelectedSubject: (subjectId) => set({ selectedSubject: subjectId }),
}))
