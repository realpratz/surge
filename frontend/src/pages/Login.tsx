export default function Login() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-dark-background text-white flex items-center justify-center font-mono">
      <div className="absolute inset-0 z-0 text-gray-400 opacity-15 whitespace-pre-wrap text-[30px] px-4 select-none overflow-hidden">
        <div className="animate-scroll-code">
          <div>{codeBlock}</div>
          <div>{codeBlock}</div>
        </div>
      </div>

      <div className="z-10 backdrop-blur-md bg-white/5 border border-white/10 px-10 py-12 rounded-xl shadow-2xl flex flex-col items-center text-center">
        <img src="/logo-v2.png" alt="Logo" className="w-14 h-14" />

        <h1 className="text-5xl font-bold tracking-widest text-white mb-3 mt-6">
          SURGE
        </h1>
        <p className="text-sm text-gray-300 mb-8">powered by CRUx</p>
        <a href={`${import.meta.env.VITE_API_BASE_URL}/auth/google`}>
          <button className="bg-gradient-to-br from-highlight-light to-accent-red text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition hover:cursor-pointer">
            Login using Google
          </button>
        </a>
      </div>

      <style>
        {`
          @keyframes scroll-code {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }

          .animate-scroll-code {
            display: flex;
            flex-direction: column;
            animation: scroll-code 30s linear infinite;
          }
        `}
      </style>
    </div>
  );
}

const codeBlock = `
#include <bits/stdc++.h>
using namespace std;

void solve() {
    int rating = 800;
    while (true) {
        try {
            code();
            debug();
            if (passesTests()) submit();
        } catch (TestCaseWA e) {
            cout << "WA on test case " << e.id << endl;
        }
    }
}


void motivation() {
    cout << "work hard bro one day you got 7* coder" << endl;
    cout << "codechef, international grandmaster on codeforces" << endl;
    cout << "your cp skill beat Sundar Pichai and you become next CEO in google" << endl;
    cout << "- Karthik Prakash, Dev Secretary (24-25)" << endl;
}

// ☕ grind
class Programmer {
public:
    bool sleep = false;
    bool practice = true;
    int rating = 800;

    void getBetter() {
        while (!red()) {
            practiceHard();
        }
    }

    bool red() {
        return rating >= 2400;
    }
};

void life() {
    while (true) {
        learn();
        build();
        fail();
        repeat();
    }
}

int randIQ() {
    return 150 + rand() % 51;
}

int peakRating() {
    return 800 + rand() % 1601;
}

void checkForWF() {
    if (randIQ() > 180 && peakRating() > 2200) {
        cout << "👑 Candidate for ICPC WF spotted." << endl;
    }
}

/*
    “I fear not the man who has practiced 10,000 problems once,
     but I fear the man who has practiced one problem 10,000 times.”
     – BruCPee
*/

int main() {
    cout << "Hello from CRUx 💻" << endl;
    motivation();
    checkForWF();
    return 0;
}
`;
