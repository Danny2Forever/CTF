"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Plus, 
  Flag, 
} from 'lucide-react'
import { motion } from 'motion/react'

const navigationItems = [
  { 
    label: 'Admin Panel', 
    path: '/admin-panel', 
    icon: LayoutDashboard 
  },
  { 
    label: 'Create Problem', 
    path: '/admin-panel/create-problem', 
    icon: Flag 
  },
  { 
    label: 'Create Course', 
    path: '/admin-panel/create-course', 
    icon: Plus 
  },
]

const AdminSidebar = () => {
  const pathname = usePathname()

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700 p-4"
    >
      <nav className="space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.path

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group
                ${isActive 
                  ? 'bg-primary/10 dark:bg-primary/20 text-primary' 
                  : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'}
              `}
            >
              <Icon 
                className={`
                  h-5 w-5 transition-colors duration-300
                  ${isActive 
                    ? 'text-primary' 
                    : 'text-slate-400 dark:text-slate-500 group-hover:text-primary'}
                `} 
              />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </motion.div>
  )
}

export default AdminSidebar