<<<<<<< HEAD
import { inngest } from "@/lib/inngest/client";
import { helloWorld } from "@/lib/inngest/function";
import { serve } from "inngest/next";
=======
import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";
import { generateIndustryInsights } from "@/lib/inngest/functions";
>>>>>>> 19a5dbbf071489aafa0e99db72145efbb9666c06

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    /* your functions will be passed here later! */
<<<<<<< HEAD
    helloWorld,
  ],
});
=======
    generateIndustryInsights,
  ],
});
>>>>>>> 19a5dbbf071489aafa0e99db72145efbb9666c06
