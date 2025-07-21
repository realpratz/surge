import { useState } from "react";
import { X, Loader, CheckCircle } from "lucide-react";
import axios from "axios";

interface EditProfileModalProps {
  initialValues: {
    pfpUrl: string;
    atcoderHandle: string;
    leetcodeHandle: string;
    codechefHandle: string;
  };
  onClose: () => void;
  onSuccess: (updatedUser: any) => void;
}

export default function EditProfileModal({
  initialValues,
  onClose,
  onSuccess,
}: EditProfileModalProps) {
  const [formData, setFormData] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/profile/edit`,
        formData,
        { withCredentials: true }
      );

      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/profile`,
        { withCredentials: true }
      );

      setSuccess(true);
      setTimeout(() => {
        onSuccess(res.data);
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-dark-background flex items-center justify-center z-50 shadow-5xl">
      <div className="bg-highlight-dark text-white p-6 rounded-lg w-[90%] max-w-lg shadow-xl relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-white hover:cursor-pointer"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <h2 className="text-xl mb-6 font-semibold">Edit Your Profile</h2>

        {success ? (
          <div className="flex flex-col items-center text-center">
            <CheckCircle className="w-12 h-12 text-green-400 mb-4" />
            <p className="text-lg font-semibold text-green-300">
              Profile updated successfully!
            </p>
            <p className="text-sm text-gray-300 mt-2">Closing shortly...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Profile Picture URL"
              name="pfpUrl"
              value={formData.pfpUrl}
              onChange={handleChange}
            />
            <InputField
              label="AtCoder Handle"
              name="atcoderHandle"
              value={formData.atcoderHandle}
              onChange={handleChange}
            />
            <InputField
              label="LeetCode Handle"
              name="leetcodeHandle"
              value={formData.leetcodeHandle}
              onChange={handleChange}
            />
            <InputField
              label="CodeChef Handle"
              name="codechefHandle"
              value={formData.codechefHandle}
              onChange={handleChange}
            />

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              className="bg-highlight-light hover:bg-gray-700 hover:cursor-pointer text-white px-4 py-2 rounded w-full transition"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader className="w-4 h-4 animate-spin" /> Saving...
                </span>
              ) : (
                "Save Changes"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-1" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 bg-dark-background text-white rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-highlight-light"
      />
    </div>
  );
}
