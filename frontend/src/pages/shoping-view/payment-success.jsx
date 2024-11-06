import { Button, Card } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

function PaymentSuccesPage() {
  const navigate = useNavigate();
  return (
    <Card title="Payment is successfull!">
      <Button className="mt-5" onClick={() => navigate("/shop/account")}>
        View Orders
      </Button>
    </Card>
  );
}

export default PaymentSuccesPage;
