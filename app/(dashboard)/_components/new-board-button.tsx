"use client";

import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface NewBoardButtonProps {
    orgId: string;
    disabled?: boolean;
};

export const NewBoardButton = ({orgId,disabled}: NewBoardButtonProps) => {
    const router = useRouter();
    const create = useMutation(api.board.create);
    const onClick = () => {
        create({
            orgId,
            title: "Untitled"
        })
        .then((id) => {
            toast.success("Board Created");
            router.push(`/board/${id}`);
        })
        .catch(() => toast.error("Failed"));
    }

    return (
        <button disabled={disabled} onClick={onClick} className={cn(
            "col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-700 flex flex-col items-center justify-center py-6",
            disabled && "opacity-75 hover:bg-blue-600 cursor-not-allowed"
        )}>
            <div />
            <Plus className="h-12 w-12 text-white stroke-1"/>
            <p className="text-sm text-white font-light">
                New Board
            </p>
        </button>
    );
};