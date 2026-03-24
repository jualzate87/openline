export async function notifySlack(message: string): Promise<void> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL!;
  const timestamp = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const truncated =
    message.length > 2900 ? message.slice(0, 2900) + "…" : message;

  const body = {
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "📣 New Open Line Submission",
          emoji: true,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `_"${truncated}"_`,
        },
      },
      { type: "divider" },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: `🕐 *${timestamp}* · Submitted via The Open Line · Fully anonymous`,
          },
        ],
      },
    ],
  };

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  if (text !== "ok") {
    throw new Error(`Slack webhook returned: ${text}`);
  }
}
