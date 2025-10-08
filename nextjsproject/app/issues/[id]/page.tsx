"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Card, Heading, Text, Button } from "@radix-ui/themes";
import Link from "next/link";
import Spinner from "@/app/components/Spinner";

interface Issue {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

const IssueDetailPage = () => {
  const { id } = useParams(); // ✅ get issue id from URL
  const [issue, setIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const res = await axios.get(`/api/issues/${id}`);
        setIssue(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load issue details.");
      } finally {
        setLoading(false);
      }
    };
    fetchIssue();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-600 font-medium mt-10">{error}</div>
    );

  if (!issue)
    return (
      <div className="text-center text-gray-500 mt-10">
        Issue not found or deleted.
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <Card className="p-6 rounded-2xl shadow-md">
        <Heading size="5" className="mb-4">
          {issue.title}
        </Heading>
        <Text as="p" className="text-gray-700 whitespace-pre-line">
          {issue.description}
        </Text>
        <div className="text-sm text-gray-400 mt-3">
          Created at: {new Date(issue.createdAt).toLocaleString()}
        </div>
      </Card>

      <div className="mt-6 flex justify-between">
        <Link href="/issues">
          <Button variant="soft">← Back to Issues</Button>
        </Link>
        <Button variant="solid" color="orange">
          Edit Issue
        </Button>
      </div>
    </div>
  );
};

export default IssueDetailPage;
