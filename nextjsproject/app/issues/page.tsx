"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Heading, Text, Button } from "@radix-ui/themes";
import Link from "next/link";
import Spinner from "../components/Spinner";

interface Issue {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

const IssuesPage = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await axios.get("/api/issues");
        setIssues(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load issues.");
      } finally {
        setLoading(false);
      }
    };
    fetchIssues();
  }, []);

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

  return (
    <div className="max-w-2xl mx-auto mt-8 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <Heading size="5">All Issues</Heading>
        <Link href="/issues/new">
          <Button>Create New Issue</Button>
        </Link>
      </div>

      {issues.length === 0 ? (
        <Text>No issues found.</Text>
      ) : (
        issues.map((issue) => (
          <Card key={issue.id} className="p-4 rounded-xl">
            <Heading size="3" className="mb-2">
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
            </Heading>
            <Text className="text-gray-600">
              {issue.description.length > 120
                ? issue.description.slice(0, 120) + "..."
                : issue.description}
            </Text>
            <div className="text-sm text-gray-400 mt-2">
              {new Date(issue.createdAt).toLocaleString()}
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default IssuesPage;
