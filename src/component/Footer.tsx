import styled from "styled-components";

//-----------------------STYLE-----------------------//

const ContainStyle = styled.div`
  display: flex;
  padding: 30px 0;
`;

const HeaderColumnStyle = styled.div`
  padding: 20px 0;
  color: white;
`;
const ColumnStyle = styled.div`
  flex: 1;
  a {
    color: gray !important;
    text-decoration: unset;
  }
`;

//-----------------------COMPONENT-----------------------//
const Footer = () => {
  const data = [
    {
      header: "CUSTOMER SERVICES",
      col_values: [
        "Help & Contract Us",
        "Return & Refunds",
        "Online Stores",
        "Terms & Conditions",
      ],
    },
    {
      header: "COMPANY ",
      col_values: ["What We Do", "Avaliable Services", "Latest Posts", "FAQs"],
    },
    {
      header: "SOCIAL MEDIA",
      col_values: ["Twitter", "Instagram", "Facebook", "Pinterest"],
    },
  ];

  return (
    <div style={{background: 'black'}}>
      <ContainStyle className="container">
        {/* page contains */}

        {data.map((item) => (
          <ColumnStyle key={item.header}>
            <HeaderColumnStyle>{item.header}</HeaderColumnStyle>
            {item.col_values.map((name, index) => (
              <div key={index}>
                <a href="#">{name}</a>{" "}
              </div>
            ))}
          </ColumnStyle>
        ))}
      </ContainStyle>
    </div>
  );
};

export default Footer;
