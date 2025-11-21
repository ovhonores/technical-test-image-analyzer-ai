'use server';

export async function imageAnalysis(file: File): Promise<any> {
  const backendUrl = process.env.BACKEND_URL;
  if (!backendUrl) {
    return {
      success: false,
      error: "BACKEND_URL is not configured",
    };
  }
  try {

    const formData = new FormData();
    formData.append("file", file);
    console.log('📤 Sending image to backend for analysis...', `${process.env.BACKEND_URL}/api/analyze`);
    const responseTags = await fetch(`${process.env.BACKEND_URL}/api/analyze`, {
      method: "POST",
      body: formData,
    });
    if (!responseTags.ok) {
      const errorText = await responseTags.text();
      console.error('Error response:', errorText);
      throw new Error(`HTTP error! status: ${responseTags.status}`);
    }
    const data = await responseTags.json();
   

    console.log('✅ Image received:', data);
    return {
      success: true,
      tags: data.tags
    };
  } catch (error: any) {
    console.error('❌ Error in imageAnalysis:', error);

    return {
      success: false,
      error: error.message
    };
  }
}