"use client";
import { useState } from "react";
import CardWrap from "@/app/components/admin/CardWrap";
import Button from "@/app/components/admin/Button"
const BASE_URL = process.env.NEXT_PUBLIC_SITE_BASE_URL;
function BigCommerceCategories() {
    const API_URL = `${BASE_URL}/api/category`; // Replace with your API
    const [copied, setCopied] = useState(false);
    const [progress, setProgress] = useState(0);
    const [data, setData] = useState([]); // Store fetched data
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    async function fetchAllPages() {
      setLoading(true);
      setError(null);
      const results = [];
      let page = 1;
      const pageSize = 250; // Adjust based on API
      let totalPages = 1;
  
      while (page <= totalPages) {
        try {
          const response = await fetch(`${API_URL}?page=${page}&limit=${pageSize}`, {
            cache:"no-store",
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
  
          if (!response.ok) throw new Error(`Error: ${response.status}`);
  
          const data = await response.json();
  
          results.push(...data.data); // Add fetched items to array
          const resTotalPages = data.meta.pagination.total_pages;
          if (page === 1 && resTotalPages) {
            totalPages = resTotalPages;
          }
  
          const _progress = (page/totalPages) * 100;
          console.log(`Fetched page ${page}/${totalPages}, progress: ${progress}`);
          setProgress(prev=> _progress);
          page++;
  
          // 🕒 Throttle requests (e.g., 500ms delay)
          await new Promise((resolve) => setTimeout(resolve, 500));
  
        } catch (error) {
          setError(error.message);
          console.error("Fetch error:", error);
          break;
        }
      }
  
      setData(results);
      setLoading(false);
    }

    const handleCopy = async () => {
        try {
          const textToCopy = JSON.stringify(data, null, 2); // Convert object to pretty JSON string
          await navigator.clipboard.writeText(textToCopy);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000); // Reset after 2s
        } catch (err) {
          console.error("Failed to copy:", err);
        }
      };
  
  return (
    <CardWrap>
        <div className="p-3 flex items-center gap-[10px]">
        <Button disabled={loading} loading={loading} variant={`teal`} onClick={fetchAllPages}>GET</Button>
        <div>
            <div className="text-sm font-semibold">Bigcommerece Categories</div>
            <div className="text-xs">Get all bigcommerce categories.</div>
        </div>
        </div>
        <div>
            <div className="w-full bg-gray-200 h-1 overflow-hidden">
                {/* Progress Fill */}
                <div
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
        <div className="p-1">
            <div className="bg-neutral-100 border border-neutral-300 p-2 rounded relative">
                <button onClick={handleCopy} className="absolute right-[20px] text-xs flex gap-[8px] text-stone-500 hover:text-stone-950"><svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1"><path d="M14 7c0-.932 0-1.398-.152-1.765a2 2 0 0 0-1.083-1.083C12.398 4 11.932 4 11 4H8c-1.886 0-2.828 0-3.414.586S4 6.114 4 8v3c0 .932 0 1.398.152 1.765a2 2 0 0 0 1.083 1.083C5.602 14 6.068 14 7 14"/><rect width="10" height="10" x="10" y="10" rx="2"/></g></svg> {copied ? "Copied": "Copy"}</button>
                <pre className="text-xs text-stone-700">
                    {JSON.stringify(data, null, 2)}
                </pre>
            </div>
        </div>
    </CardWrap>
  )
}

export default BigCommerceCategories