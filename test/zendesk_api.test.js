// Jester test -- run with "npm run testApi"
const axios = require("axios");
const zendeskApi = require("../zendesk_api/api");

jest.mock("axios");

test("check zendesk api", async () => {
  // Set up api mock
  const data = {
    data: {
      tickets: [
        {
          url: "https://ayelenbravo.zendesk.com/api/v2/tickets/1.json",
          id: 1,
          external_id: null,
          via: {
            channel: "sample_ticket",
            source: { from: {}, to: {}, rel: null },
          },
          created_at: "2020-11-08T21:26:05Z",
          updated_at: "2020-11-08T21:26:05Z",
          type: "incident",
          subject: "Sample ticket: Meet the ticket",
          raw_subject: "Sample ticket: Meet the ticket",
          description:
            "Hi Ayelen,\n\nThis is your first ticket. Ta-da! Any customer request sent to your supported channels (email, chat, voicemail, web form, and tweet) will become a Support ticket, just like this one. Respond to this ticket by typing a message above and clicking Submit. You can also see how an email becomes a ticket by emailing your new account, support@ayelenbravo.zendesk.com. Your ticket will appear in ticket views.\n\nThat's the ticket on tickets. If you want to learn more, check out: \nhttps://support.zendesk.com/hc/en-us/articles/203691476\n",
          priority: "normal",
          status: "open",
          recipient: null,
          requester_id: 406065691212,
          submitter_id: 406065688312,
          assignee_id: 406065688312,
          organization_id: null,
          group_id: 360013625592,
          collaborator_ids: [],
          follower_ids: [],
          email_cc_ids: [],
          forum_topic_id: null,
          problem_id: null,
          has_incidents: false,
          is_public: true,
          due_at: null,
          tags: ["sample", "support", "zendesk"],
          custom_fields: [],
          satisfaction_rating: null,
          sharing_agreement_ids: [],
          fields: [],
          followup_ids: [],
          brand_id: 360004887212,
          allow_channelback: false,
          allow_attachments: true,
        },
      ],
      next_page:
        "https://ayelenbravo.zendesk.com/api/v2/tickets.json?page=2&per_page=1",
      previous_page: null,
      count: 102,
    },
  };

  axios.get.mockImplementationOnce(() => Promise.resolve(data));

  // Do the work
  let inputTargetPage = "";
  let mockResult = await zendeskApi.makerequest(inputTargetPage);

  // Expects
  expect(mockResult.tickets.length).toBe(1);
  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(axios.get).toHaveBeenCalledWith(
    "https://ayelenbravo.zendesk.com/api/v2/tickets.json?per_page=25",
    {
      auth: {
        password: process.env.ZENDESK_PASSWORD,
        username: process.env.ZENDESK_USERNAME,
      },
      withCredentials: true,
    }
  );
});

test("check zendesk api - next page request", async () => {
  // Set up api mock
  const data = {
    data: {
      tickets: [{}],
      next_page:
        "https://ayelenbravo.zendesk.com/api/v2/tickets.json?page=3&per_page=1",
      previous_page:
        "https://ayelenbravo.zendesk.com/api/v2/tickets.json?page=1&per_page=1",
      count: 102,
    },
  };

  axios.get.mockImplementationOnce(() => Promise.resolve(data));

  // Do the work
  let inputTargetPage = "2";
  let mockResult = await zendeskApi.makerequest(inputTargetPage);

  // Expects
  expect(mockResult.next_page).toBe(
    "https://ayelenbravo.zendesk.com/api/v2/tickets.json?page=3&per_page=1"
  );
  expect(mockResult.previous_page).toBe(
    "https://ayelenbravo.zendesk.com/api/v2/tickets.json?page=1&per_page=1"
  );
  expect(axios.get).toHaveBeenCalledWith(
    "https://ayelenbravo.zendesk.com/api/v2/tickets.json?page=2&per_page=25",
    {
      auth: {
        password: process.env.ZENDESK_PASSWORD,
        username: process.env.ZENDESK_USERNAME,
      },
      withCredentials: true,
    }
  );
});

test("check zendesk api - unavailable", async () => {
  // Set up api mock
  const mockResponse = {
    status: 401,
    data: { error: "Couldn't authenticate you" },
  };

  axios.get.mockImplementationOnce(() => Promise.resolve(mockResponse));

  // Do the work
  let inputTargetPage = "";
  let mockResult = await zendeskApi.makerequest(inputTargetPage);

  // Expects
  expect(mockResult.error).toBe("Couldn't authenticate you");
});

test("check zendesk api - network error", async () => {
  const errorMessage = "Network Error";
  const mockResponse = new Error(errorMessage);

  axios.get.mockImplementationOnce(() => Promise.resolve(mockResponse));

  // Do the work
  let inputTargetPage = "";
  let mockResult = await zendeskApi.makerequest(inputTargetPage);

  // Expects
  expect(mockResult).toBe(undefined);
});
