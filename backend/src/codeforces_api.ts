
let problemCache:any = [];
async function fetchProblems() {
  try {
    const res = await fetch('https://codeforces.com/api/problemset.problems');
    const result = await res.json();
    if (result.status === 'OK') {
      problemCache = result.result.problems;
      console.log(problemCache.length);
    } else {
      console.error("fetch for problemset failed.");
    }
  } catch (err: any) {
    console.error(err.message);
  }
}
fetchProblems();
setInterval(fetchProblems, 6 * 60 * 60 * 1000);

export function getRandomProblem() {
  if (problemCache.length === 0) {
    throw new Error('Problem cache not initialized.');
  }
  const randomIndex = Math.floor(Math.random() * problemCache.length);
  return problemCache[randomIndex];
}

export async function verifySubmission(handle:string,contestId:number,index:string){
    try{
        const subs = await fetch(`https://codeforces.com/api/user.status?handle=${handle}&from=1&count=5`);
        const result = await subs.json();
        if(result.status === 'OK'){
            let verified = false;
            for(const doc of result.result){
                if(doc.problem.contestId === contestId && doc.problem.index === index && doc.verdict === "COMPILATION_ERROR"){
                    verified = true;
                }
            }
            return verified;
        }
        else{
            throw new Error('fetch for submission verification failed.');
        }
    }
    catch(err: any){
        throw new Error(err.message);
    }
}

export async function getUserInfo(handle:string){
    try{
        const res = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
        const user = await res.json();
        if(user.status === "OK"){
            return user.result[0];
        }
        else{
            throw new Error('fetch for user details failed.');
        }
    }
    catch(err: any){
        throw new Error(err.message);
    }
}
 