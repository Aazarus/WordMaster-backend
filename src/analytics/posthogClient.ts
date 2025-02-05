import { error } from 'console';
import { PostHog } from 'posthog-node';

const apiKey: string | undefined = process.env.POSTHOG_API_KEY;

if (!apiKey) {
  throw new Error('POSTHOG_API_KEY is not set. Please check your environment variables.');
}

console.log("🚀 ~ apiKey:", apiKey)

// Create a new instance of PostHog with your API key and host
const posthog = new PostHog(apiKey, {
  host: process.env.POSTHOG_HOST,
});

export default posthog;
