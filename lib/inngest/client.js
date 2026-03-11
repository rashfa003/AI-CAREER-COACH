import { Inngest } from "inngest";

// Create a client to send and receive events
<<<<<<< HEAD
export const inngest = new Inngest({ id: "sensai", name: "Sensai" });
=======
export const inngest = new Inngest({
  id: "aicareercoach",
  name: "Sensai",
  credentials: {
    groq: {
      apiKey: process.env.GROQ_API_KEY,
    },
  },
});
>>>>>>> 19a5dbbf071489aafa0e99db72145efbb9666c06
