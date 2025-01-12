interface UpdateLikesRequest {
  likes: number;
}

interface UpdateLikesResponse {
  likes: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export async function updatePostLikes(
  postId: number,
  likes: number
): Promise<UpdateLikesResponse> {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ likes } as UpdateLikesRequest),
  });

  if (!response.ok) {
    throw new Error("Failed to update likes");
  }

  return response.json();
}
