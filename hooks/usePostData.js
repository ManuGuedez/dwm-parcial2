export default function usePostData({ url }) {
  const postData = async (body) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const newDataWithId = await response.json();
      return newDataWithId;
    } catch (error) {
      console.log("Error posting data: ", error);
    }
  };

  return postData;
}
