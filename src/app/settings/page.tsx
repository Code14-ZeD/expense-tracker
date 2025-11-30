"use client";

import { useState, useRef } from "react";
import Header from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useProfile } from "@/hooks/use-profile";
import { Download, Upload, User } from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
    const { profile, updateProfile, loading } = useProfile();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDownload = () => {
        const data = {
            transactions: localStorage.getItem("transactions"),
            theme: localStorage.getItem("theme"),
            profile: localStorage.getItem("profile"),
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "expense-tracker-data.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success("Data downloaded successfully");
    };

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const content = event.target?.result as string;
                const data = JSON.parse(content);

                if (data.transactions) localStorage.setItem("transactions", data.transactions);
                if (data.theme) localStorage.setItem("theme", data.theme);
                if (data.profile) localStorage.setItem("profile", data.profile);

                toast.success("Data uploaded successfully. Reloading...");
                setTimeout(() => window.location.reload(), 1500);
            } catch (error) {
                console.error(error);
                toast.error("Failed to parse file");
            }
        };
        reader.readAsText(file);
    };

    const getInitials = (name: string) => {
        if (!name) return "";
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    if (loading) return null;

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black">
            <Header />
            <main className="mx-auto max-w-4xl px-4 py-8 space-y-8">
                <h1 className="text-3xl font-bold">Settings</h1>

                <Card>
                    <CardHeader>
                        <CardTitle>Profile Settings</CardTitle>
                        <CardDescription>Manage your personal information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center gap-6">
                            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold overflow-hidden">
                                {profile.name ? getInitials(profile.name) : <User className="h-10 w-10" />}
                            </div>
                            <div className="space-y-1">
                                <h3 className="font-medium">Avatar</h3>
                                <p className="text-sm text-muted-foreground">
                                    Generated from your name initials
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    value={profile.name}
                                    onChange={(e) => updateProfile({ ...profile, name: e.target.value })}
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="age">Age</Label>
                                <Input
                                    id="age"
                                    type="number"
                                    value={profile.age}
                                    onChange={(e) => updateProfile({ ...profile, age: e.target.value })}
                                    placeholder="Enter your age"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="gender">Gender</Label>
                                <Select
                                    value={profile.gender}
                                    onValueChange={(value) => updateProfile({ ...profile, gender: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Data Management</CardTitle>
                        <CardDescription>Download or upload your app data and configuration</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Button onClick={handleDownload} className="flex-1 gap-2">
                                <Download className="h-4 w-4" />
                                Download Data
                            </Button>
                            <Button
                                variant="outline"
                                className="flex-1 gap-2"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Upload className="h-4 w-4" />
                                Upload Data
                            </Button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept=".json,.txt"
                                onChange={handleUpload}
                            />
                        </div>
                        <p className="text-sm text-muted-foreground">
                            This will export your transactions, settings, and profile data to a text file.
                            Uploading a file will overwrite your current data.
                        </p>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
