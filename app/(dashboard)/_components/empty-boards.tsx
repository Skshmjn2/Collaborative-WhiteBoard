"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useOrganization } from "@clerk/nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const EmptyBoards = () => {
    const router = useRouter();
    const { organization } = useOrganization();
    const create = useMutation(api.board.create);
    const onClick = () => {
        if(!organization){
            return;
        }

        create({
            orgId: organization.id,
            title: "Untitled",
        })
        .then((id) => {
            toast.success("Board created");
            router.push(`/board/${id}`);
        })
        .catch(() => toast.error("Failed"));
    };

    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image src="/note.svg" alt="board" height={110} width={110}/>
            <h2 className="text-2xl font-semibold mt-6">
                Create Your First Board!
            </h2>
            <p className="text-muted-foreground textg-sm mt-2">
                Start by creating a board for your Organization.
            </p>
            <div className="mt-6">
                <Button onClick={onClick} size="lg">
                    Create Board
                </Button>
            </div>
        </div>
    );
};
