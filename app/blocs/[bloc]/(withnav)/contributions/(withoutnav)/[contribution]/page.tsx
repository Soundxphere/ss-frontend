"use client";

import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";

import ContributionHeader from "@/components/molecules/ContributionInfo";
import CommentSection from "@/components/organisms/CommentSection";

interface Contribution {
  id: string;
  description: string;
  status: string;
  author: string;
  postId: string;
  creationDate: string;
  lastUpdated: string;
  contributors: string[];
}

export default function page() {
  const { bloc: blocId, contribution: contributionId } = useParams();

  const [contribution, setContribution] = useState<Contribution | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    if (typeof contributionId === "string") {
      setContribution({
        id: contributionId,
        description: "This is a placeholder description.",
        status: "Placeholder status",
        author: "Placeholder author",
        postId:
          "kjzl6cwe1jw14aj446xmudhym9cqitxku8ol1yno5gjmwvj6a7y12v2brtin2yn",
        creationDate: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        contributors: ["me", "you"],
      });
    }
    setIsLoading(false);
  }, [contributionId, blocId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!contribution) {
    return notFound();
  }

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <ContributionHeader
        description={contribution.description}
        status={contribution.status}
        author={contribution.author}
        creationDate={contribution.creationDate}
        lastUpdated={contribution.lastUpdated}
        contributors={contribution.contributors}
      />

      <CommentSection postId={contribution.postId} />
    </div>
  );
}
