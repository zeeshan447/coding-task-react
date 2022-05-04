export const DonationColumnNames = [
  {
    title: "Name",
    dataIntex: "name",
    render: (record) => <span>{record.name}</span>,
  },
  {
    title: "Reference",

    dataIntex: "reference",
    render: (record) => <span>{record.reference}</span>,
  },
  {
    title: "Price",

    dataIntex: "price",

    render: (record) => (
      <div>
        {record.price === undefined ? "" : <span>£{record.price}</span>}{" "}
      </div>
    ),
  },
  {
    title: "Status",

    dataIntex: "status",
    render: (record) => <span>{record.status}</span>,
    filters: [
      {
        text: "Active",
        value: "Active",
      },
      {
        text: "Awaiting Approval",
        value: "Awaiting Approval",
      },
      {
        text: "Inactive",
        value: "Inactive",
      },
    ],

    onFilter: (text, record) => {
      return record.status === text;
    },
  },
  {
    title: "Location",

    dataIntex: "location",
    render: (record) => <span>{record.location}</span>,
  },
  {
    title: "Theme",

    dataIntex: "theme",
    render: (record) => <span>{record.theme}</span>,
  },
];
