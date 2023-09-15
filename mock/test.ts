export default function () {
  return [
    {
      url: "/api/get",
      method: "get",
      response: () => {
        return {
          code: 200,
          data: "ok"
        };
      }
    },
    {
      url: "/api/test",
      method: "post",
      rawResponse: async (req, res) => {
        const reqbody = "hello,world";
        res.end(reqbody);
      }
    },
    {
      url: "/api/v1/gitlab",
      methods: "get",
      response: () => {
        return {
          code: 200,
          data: "haha xxx"
        };
      }
    }
  ];
}
