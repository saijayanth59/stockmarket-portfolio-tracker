import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

export function NewsCard({ article }) {
  const date = new Date(article.datetime * 1000).toLocaleDateString();

  return (
    <Card className="flex flex-col h-full">
      <CardContent className="flex-grow p-4">
        <div className="flex justify-between items-center mb-2">
          <Badge>{article.category}</Badge>
          <span className="text-sm text-muted-foreground">{date}</span>
        </div>
        <h3 className="text-lg font-semibold mb-2">{article.headline}</h3>
        <p className="text-sm text-muted-foreground">{article.summary}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex justify-between items-center w-full">
          <span className="text-sm font-medium">{article.source}</span>
          <Link
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline"
          >
            Read more
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
