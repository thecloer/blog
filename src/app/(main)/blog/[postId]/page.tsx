interface BlogPostPageProps {
  params: {
    postId: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { postId } = params;

  return <div>{postId}</div>;
}
