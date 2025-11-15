
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const AdminSettings: React.FC = () => {
    const { changePassword, changeUsername, username } = useAuth();

    // State for password change
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // State for username change
    const [currentPasswordForUname, setCurrentPasswordForUname] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [usernameMessage, setUsernameMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordMessage(null);

        if (newPassword !== confirmPassword) {
            setPasswordMessage({ type: 'error', text: 'New passwords do not match.' });
            return;
        }

        if (newPassword.length < 6) {
            setPasswordMessage({ type: 'error', text: 'New password must be at least 6 characters long.' });
            return;
        }

        const success = changePassword(oldPassword, newPassword);

        if (success) {
            setPasswordMessage({ type: 'success', text: 'Password changed successfully!' });
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } else {
            setPasswordMessage({ type: 'error', text: 'Incorrect old password.' });
        }
    };
    
    const handleUsernameSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setUsernameMessage(null);
        
        if (!newUsername.trim()) {
            setUsernameMessage({ type: 'error', text: 'Username cannot be empty.' });
            return;
        }

        const success = changeUsername(currentPasswordForUname, newUsername);

        if (success) {
            setUsernameMessage({ type: 'success', text: 'Username changed successfully!' });
            setCurrentPasswordForUname('');
            setNewUsername('');
        } else {
            setUsernameMessage({ type: 'error', text: 'Incorrect password.' });
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Change Username Form */}
                <form onSubmit={handleUsernameSubmit} className="space-y-4 p-6 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                    <h3 className="text-lg font-semibold">Change Username</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Current Username: <strong>{username}</strong></p>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="newUsername">New Username</label>
                        <input
                            type="text"
                            id="newUsername"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                            required
                             className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="currentPasswordForUname">Current Password</label>
                        <input
                            type="password"
                            id="currentPasswordForUname"
                            value={currentPasswordForUname}
                            onChange={(e) => setCurrentPasswordForUname(e.target.value)}
                            required
                            className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
                            placeholder="Enter password to confirm"
                        />
                    </div>
                    {usernameMessage && (
                        <p className={`text-sm ${usernameMessage.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                            {usernameMessage.text}
                        </p>
                    )}
                    <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                        Update Username
                    </button>
                </form>

                {/* Change Password Form */}
                <form onSubmit={handlePasswordSubmit} className="space-y-4 p-6 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                    <h3 className="text-lg font-semibold">Change Password</h3>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="oldPassword">Old Password</label>
                        <input
                            type="password"
                            id="oldPassword"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                            className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
                        />
                    </div>
                     <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="newPassword">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                             className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
                        />
                    </div>
                     <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">Confirm New Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
                        />
                    </div>
                    {passwordMessage && (
                        <p className={`text-sm ${passwordMessage.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                            {passwordMessage.text}
                        </p>
                    )}
                    <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminSettings;
