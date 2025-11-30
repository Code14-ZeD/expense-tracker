"use client";

import { useState } from "react";
import { useTransactions } from "@/lib/context";
import { CATEGORIES, TransactionType } from "@/lib/types";
import { motion } from "framer-motion";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export default function TransactionForm() {
    const t = useTranslations('Dashboard.addTransaction');
    const { addTransaction } = useTransactions();
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [type, setType] = useState<TransactionType>("expense");
    const [date, setDate] = useState(() => {
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!amount || !description || !category) {
            toast.error(t('error'));
            return;
        }

        addTransaction({
            amount: parseFloat(amount),
            description,
            category,
            type,
            date: new Date(date + "T00:00").toISOString(),
        });

        setAmount("");
        setDescription("");
        setCategory("");
        setDate(() => {
            const d = new Date();
            return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        });
        toast.success(t('success'));
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
        >
            <Card>
                <CardHeader>
                    <CardTitle>{t('title')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs
                        defaultValue="expense"
                        value={type}
                        onValueChange={(v) => setType(v as TransactionType)}
                        className="w-full"
                    >
                        <TabsList className="grid w-full grid-cols-2 mb-4">
                            <TabsTrigger
                                value="income"
                                className="data-[state=active]:bg-[#009966] data-[state=active]:text-white dark:data-[state=active]:bg-[#009966] dark:data-[state=active]:text-white"
                            >
                                {t('income')}
                            </TabsTrigger>
                            <TabsTrigger
                                value="expense"
                                className="data-[state=active]:bg-[#e8000c] data-[state=active]:text-white dark:data-[state=active]:bg-[#e8000c] dark:data-[state=active]:text-white"
                            >
                                {t('expense')}
                            </TabsTrigger>
                        </TabsList>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="date">{t('date')}</Label>
                                    <Input
                                        id="date"
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="amount">{t('amount')}</Label>
                                    <Input
                                        id="amount"
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">{t('description')}</Label>
                                <Input
                                    id="description"
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="e.g. Grocery, Salary"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category">{t('category')}</Label>
                                <Select value={category} onValueChange={setCategory}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t('selectCategory')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {CATEGORIES[type].map((cat) => (
                                            <SelectItem key={cat} value={cat}>
                                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20,
                                    }}
                                >
                                    <PlusIcon className="mr-2 h-4 w-4" />
                                </motion.div>
                                {t('submit')}
                            </Button>
                        </form>
                    </Tabs>
                </CardContent>
            </Card>
        </motion.div>
    );
}
