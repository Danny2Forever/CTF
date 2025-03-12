import React from 'react'

const navigationItems = [
    { label: 'Admin Panel', path: '/admin-panel' },
    { label: 'Create Problem', path: '/admin-panel/create-problem' },
    { label: 'Create Course', path: '/admin-panel/create-course' },
];

const AdminSidebar = () => {
    return (
        <div className="w-1/4">
            <nav className="space-y-4">
                {navigationItems.map((item) => (
                    <a
                        key={item.path}
                        href={item.path}
                        className="block cursor-pointer hover:bg-gray-200 p-2 rounded-md transition-colors"
                    >
                        {item.label}
                    </a>
                ))}
            </nav>
        </div>
    )
}

export default AdminSidebar