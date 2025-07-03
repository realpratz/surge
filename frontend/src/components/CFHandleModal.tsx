import { useEffect, useState } from "react";
import { Loader, CheckCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface CFHandleModalProps {
  onSuccess: (updatedUser: any) => void;
}

export default function CFHandleModal({ onSuccess }: CFHandleModalProps) {
  const [handle, setHandle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [problemLink, setProblemLink] = useState<string | null>(null);
  const [contestId, setContestId] = useState<number | null>(null);
  const [index, setIndex] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [timerActive, setTimerActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [verifiedUser, setVerifiedUser] = useState<any>(null);
  const { user } = useAuth();

  const startVerification = async () => {
    try {
      setSubmitting(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/account/start-verification`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ handle }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setProblemLink(data.problemLink);
        setContestId(data.contestId);
        setIndex(data.index);
        setTimerActive(true);
        setTimeLeft(60);
        setError(null);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Something went wrong while starting verification.");
    } finally {
      setSubmitting(false);
    }
  };

  const checkVerification = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/account/check-verification`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ handle, contestId, index }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setVerifiedUser(data.data);
        setSuccess(true);
        setTimeout(() => {
          onSuccess(data.data);
        }, 5000);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Verification check failed.");
    }
  };

  useEffect(() => {
    if (!timerActive) return;
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timerActive, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && timerActive) {
      checkVerification();
      setTimerActive(false);
    }
  }, [timeLeft, timerActive]);

  return (
    <div className="fixed inset-0 bg-dark-background bg-opacity-70 flex items-center justify-center z-50 shadow-4xl">
      <div className="bg-highlight-dark text-white p-6 rounded-lg w-[90%] max-w-lg shadow-xl">
        <h2 className="text-xl mb-6 text-white flex items-center gap-2">
          Welcome{" "}
          {user?.name
            ? (() => {
                const firstName = user.name.split(" ")[0];
                return (
                  firstName.charAt(0).toUpperCase() +
                  firstName.slice(1).toLowerCase()
                );
              })()
            : ""}
          ! 👋
        </h2>
        <h2 className="text-lg mb-6 text-gray-400 flex items-center gap-2">
          Start by connecting your Codeforces account:
        </h2>
        {success ? (
          <div className="flex flex-col items-center text-center">
            <CheckCircle className="w-12 h-12 text-green-400 mb-4" />
            <p className="text-lg font-semibold">
              Successfully connected to{" "}
              <span className="text-highlight-light">
                {verifiedUser?.cfHandle}
              </span>
            </p>
            <p className="text-sm text-gray-300">
              Rating:{" "}
              <span className="text-yellow-300 font-semibold">
                {verifiedUser?.cfRating}
              </span>
            </p>
            <p className="text-sm text-gray-300 mt-2">
              Redirecting in 5 seconds...
            </p>
          </div>
        ) : !problemLink ? (
          <>
            <input
              className="w-full p-2 border border-black bg-dark-background text-white rounded mb-4"
              placeholder="Enter Codeforces handle"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              disabled={submitting}
            />
            <button
              onClick={startVerification}
              className="bg-highlight-light hover:bg-highlight-dark border border-highlight-light text-white px-4 py-2 rounded w-full transition hover:cursor-pointer"
              disabled={submitting || !handle.trim()}
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader className="w-4 h-4 animate-spin" /> Starting...
                </span>
              ) : (
                "Start Verification"
              )}
            </button>
          </>
        ) : (
          <>
            <p className="mb-4 text-md">
              Submit a{" "}
              <span className="text-yellow-300 font-semibold">
                compilation error
              </span>{" "}
              to:
              <br />
              <a
                href={problemLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline break-all"
              >
                {problemLink}
              </a>
            </p>
            <p className="mb-4 text-sm">
              Time left:{" "}
              <span className="font-semibold">{timeLeft} seconds</span>
            </p>
            <button
              onClick={checkVerification}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full transition hover:cursor-pointer"
            >
              Check Verification Now
            </button>
          </>
        )}

        {error && <p className="text-red-400 mt-4 text-sm">{error}</p>}
      </div>
    </div>
  );
}
