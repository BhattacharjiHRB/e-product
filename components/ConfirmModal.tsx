"use client";
import React from "react";
import { Button } from "./ui/button";

export default function ConfirmModal({
  open,
  title,
  children,
  onClose,
  onConfirm,
  loading,
}: {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  loading?: boolean;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-black/40">
      <div className="bg-card p-6 rounded-2xl shadow max-w-md w-full animate-in transform transition duration-300">
        <h3 className="text-lg font-bold">{title.toUpperCase()}</h3>
        <div className="mt-3">{children}</div>
        <div className="mt-4 flex justify-end gap-2">
          <Button
            onClick={onClose}
            variant={"default"}
            className="px-3 py-1 border rounded"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={loading}
            variant={"destructive"}
            className="px-3 py-1 bg-[#A44A3F] rounded"
          >
            {loading ? "Confirming..." : "Confirm"}
          </Button>
        </div>
      </div>
    </div>
  );
}
