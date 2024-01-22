import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { createOrder } from 'services/orderService';

const Success = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();

  const { cart, data } = state;

  const { user } = useSelector((state) => ({ ...state.user }));
  const { reset } = useSelector((state) => ({ ...state.cart }));

  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    if (data) {
      (async () => {
        try {
          const newOrder = {
            userId: user._id,
            products: cart.map((item) => ({
              productId: item._id,
              quantity: item.quantity,
            })),
            amount: cart.total,
            address: data.billing_details.address,
          };

          const { data } = await createOrder(newOrder);

          setOrderId(data._id);
          dispatch(reset());
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [cart, data, dispatch, reset, user]);

  return (
    <Container>
      <Span>
        {orderId
          ? `Order has been created successfully. Your order number is ${orderId}`
          : `Successful. Your order is being prepared...`}
      </Span>
      <Button type='button'>Go to home</Button>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.bg};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Span = styled.span``;

const Button = styled.button`
  display: inline-block;
  border: none;
  padding: 1rem;
  margin-top: 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
`;

export default Success;
