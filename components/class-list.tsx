"use client"

import { motion } from "framer-motion"
import { useIslamicKnowledgeStore } from "@/lib/store"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Calendar, BookOpen, MapPin, Users } from "lucide-react"

export function ClassList() {
  const { classes, selectedTopic, selectedScholar } = useIslamicKnowledgeStore()

  // Filter classes by selected topic and scholar
  const filteredClasses = classes.filter((cls) => cls.topicId === selectedTopic && cls.scholarId === selectedScholar)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  if (filteredClasses.length === 0) {
    return (
      <Card className="p-8 text-center border-emerald-100 dark:border-emerald-900">
        <CardContent>
          <p className="text-muted-foreground">No classes available for this topic.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      {filteredClasses.map((cls) => (
        <motion.div key={cls.id} variants={itemVariants}>
          <Card className="border-emerald-100 dark:border-emerald-900 overflow-hidden">
            <div className="h-1 bg-emerald-600"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-emerald-600" />
                {cls.title}
              </CardTitle>
              <CardDescription>{cls.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-100"
                >
                  <Clock className="h-3 w-3" />
                  {cls.duration} minutes
                </Badge>
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-100"
                >
                  <Calendar className="h-3 w-3" />
                  {cls.date}
                </Badge>
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-100"
                >
                  <MapPin className="h-3 w-3" />
                  {cls.location}
                </Badge>
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-100"
                >
                  <Users className="h-3 w-3" />
                  {cls.attendees} attendees
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{cls.additionalInfo}</p>
            </CardContent>
            <CardFooter>
              <Button className="bg-emerald-600 hover:bg-emerald-700">Register for Class</Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
