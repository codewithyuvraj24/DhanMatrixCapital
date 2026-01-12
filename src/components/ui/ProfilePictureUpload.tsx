"use client"

import { useState, useRef } from 'react'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { updateProfile } from 'firebase/auth'
import { auth, storage } from '@/lib/firebase'
import { Camera, Upload, X, Check } from 'lucide-react'
import Image from 'next/image'

interface ProfilePictureUploadProps {
    currentPhotoURL?: string | null
    displayName?: string
    onUploadComplete?: (photoURL: string) => void
}

export default function ProfilePictureUpload({
    currentPhotoURL,
    displayName = 'User',
    onUploadComplete
}: ProfilePictureUploadProps) {
    const [uploading, setUploading] = useState(false)
    const [preview, setPreview] = useState<string | null>(null)
    const [error, setError] = useState('')
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please select an image file')
            return
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('Image must be less than 5MB')
            return
        }

        setError('')

        // Create preview
        const reader = new FileReader()
        reader.onloadend = () => {
            setPreview(reader.result as string)
        }
        reader.readAsDataURL(file)

        // Upload to Firebase Storage
        await uploadImage(file)
    }

    const uploadImage = async (file: File) => {
        if (!auth.currentUser) return

        setUploading(true)
        try {
            // Create a reference to the storage location
            const storageRef = ref(storage, `profile-pictures/${auth.currentUser.uid}/${Date.now()}_${file.name}`)

            // Upload the file
            const snapshot = await uploadBytes(storageRef, file)

            // Get the download URL
            const downloadURL = await getDownloadURL(snapshot.ref)

            // Update user profile
            await updateProfile(auth.currentUser, {
                photoURL: downloadURL
            })

            // Callback
            onUploadComplete?.(downloadURL)

        } catch (err: any) {
            console.error('Upload error:', err)
            setError('Failed to upload image. Please try again.')
            setPreview(null)
        } finally {
            setUploading(false)
        }
    }

    const photoURL = preview || currentPhotoURL

    return (
        <div className="flex flex-col items-center gap-4">
            {/* Avatar Display */}
            <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-4xl font-black border-4 border-white shadow-xl">
                    {photoURL ? (
                        <Image
                            src={photoURL}
                            alt={displayName}
                            width={128}
                            height={128}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span>{displayName.charAt(0).toUpperCase()}</span>
                    )}
                </div>

                {/* Upload Button Overlay */}
                <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer disabled:cursor-not-allowed"
                >
                    {uploading ? (
                        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <Camera className="text-white" size={32} />
                    )}
                </button>

                {/* Upload Success Indicator */}
                {preview && !uploading && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white">
                        <Check className="text-white" size={16} strokeWidth={3} />
                    </div>
                )}
            </div>

            {/* Upload Button */}
            <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2 disabled:opacity-50 active:scale-95"
            >
                {uploading ? (
                    <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Uploading...
                    </>
                ) : (
                    <>
                        <Upload size={16} />
                        Upload Photo
                    </>
                )}
            </button>

            {/* Hidden File Input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
            />

            {/* Error Message */}
            {error && (
                <p className="text-xs text-red-600 font-medium bg-red-50 px-3 py-2 rounded-lg">
                    {error}
                </p>
            )}

            {/* Helper Text */}
            <p className="text-xs text-slate-500 text-center">
                JPG, PNG or GIF. Max size 5MB.
            </p>
        </div>
    )
}
