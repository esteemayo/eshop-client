import styled, { css } from 'styled-components';
import StripeCheckout from 'react-stripe-checkout';
import { Add, Remove } from '@material-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { Fragment, useEffect, useState } from 'react';

import { stripePayment } from 'services/stripeService';
import { getTotals, reset, toggleQuantity } from 'redux/cart/cartSlice';
import { laptop, mobile, small, smallest, tab } from 'responsive';

const Cart = () => {
  const dispatch = useDispatch();
  const { cart, total } = useSelector((state) => state.cart);
  const KEY = process.env.REACT_APP_STRIPE_KEY;

  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();

  const onToken = (token) => {
    setStripeToken(token);
  };

  const handleIncrement = (productId) => {
    dispatch(toggleQuantity({ id: productId, type: 'inc' }));
    dispatch(getTotals());
  };

  const handleDecrement = (productId) => {
    dispatch(toggleQuantity({ id: productId, type: 'dec' }));
    dispatch(getTotals());
  };

  useEffect(() => {
    stripeToken && total >= 1 && (async () => {
      try {
        const { data } = await stripePayment({
          tokenId: stripeToken.id,
          amount: total * 100,
        });

        dispatch(reset());
        navigate('/success', { state: data });
      } catch (err) {
        console.log(err);
      }
    })();
  }, [total, stripeToken, navigate, dispatch]);

  useEffect(() => {
    dispatch(getTotals());
  }, [dispatch]);

  if (cart.length === 0) {
    return (
      <Container>
        <CartWrapper>
          <Title>Your cart is currently empty</Title>
        </CartWrapper>
      </Container>
    );
  }

  return (
    <Container>
      <Wrapper>
        <Title>Your bag</Title>
        <Top>
          <Link to='/'>
            <TopButton>Continue shopping</TopButton>
          </Link>
          <TopTexts>
            <TopText>Shopping bag (2)</TopText>
            <TopText>Your wishlist (0)</TopText>
          </TopTexts>
          <TopButton type='filled'>Checkout now</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart?.map((item) => {
              const { _id: id, img, size, price, color, title, quantity } = item;
              return (
                <Fragment key={id}>
                  <Product>
                    <ProductDetail>
                      <Image src={img} alt='' />
                      <Details>
                        <ProductName>
                          <strong>Product:</strong> {title}
                        </ProductName>
                        <ProductId>
                          <strong>Id:</strong> {id}
                        </ProductId>
                        <ProductColor color={color} />
                        <ProductSize>
                          <strong>Size:</strong> {size}
                        </ProductSize>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        <ProductButton>
                          <Add onClick={() => handleIncrement(id)} />
                        </ProductButton>
                        <ProductAmount>{quantity}</ProductAmount>
                        <ProductButton>
                          <Remove onClick={() => handleDecrement(id)} />
                        </ProductButton>
                      </ProductAmountContainer>
                      <ProductPrice>
                        <NumericFormat
                          value={price * quantity}
                          displayType={'text'}
                          thousandSeparator={true}
                          prefix={'$'}
                        />
                      </ProductPrice>
                    </PriceDetail>
                  </Product>
                  <Hr />
                </Fragment>
              );
            })}
          </Info>
          <Summary>
            <SummaryTitle>Order summary</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>
                <NumericFormat
                  value={total}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'$'}
                />
              </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated shipping</SummaryItemText>
              <SummaryItemPrice>$5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping discount</SummaryItemText>
              <SummaryItemPrice>$-5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type='total'>
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>
                <NumericFormat
                  value={total}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'$'}
                />
              </SummaryItemPrice>
            </SummaryItem>
            {/* <StripeCheckout
              name='eShop'
              image='https://media.istockphoto.com/vectors/shopping-cart-line-icon-fast-buy-vector-logo-vector-id1184670036?k=20&m=1184670036&s=612x612&w=0&h=FpKQukhJ4X8WQkucHPbCqANJROKYB2v3k9ov3x-3vdI='
              billingAddress
              shippingAddress
              description={`Your total is $${total}`}
              amount={total * 100}
              currency='USD'
              stripeKey={KEY}
              token={onToken}
            >
              <Button>Checkout now</Button>
            </StripeCheckout> */}
          </Summary>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  padding: 2rem;

  ${mobile({ padding: '1rem' })}
`;

const CartWrapper = styled.div`
  padding: 13rem;
`;

const Title = styled.h1`
  font-weight: 300;
  font-size: 3.2rem;
  text-align: center;
  text-transform: uppercase;

  ${mobile({ fontSize: '2.7rem' })}

  ${small({ fontSize: '2.5rem' })}
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;

  ${small({ padding: '0.8rem' })}
`;

const TopButton = styled.button`
  border: ${({ type }) => type === 'filled' ? 'none' : '2px solid #008080'};
  background-color: ${({ type, theme }) => type === 'filled' ? theme.bgCartBtn : 'transparent'};
  color: ${({ type, theme }) => (type === 'filled' ? theme.textCartBtn : '#008080')};
  display: inline-block;
  border-radius: 5px;
  padding: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  outline-color: ${({ theme }) => theme.text};
  cursor: pointer;
  transition: all 0.5s ease;

  ${mobile({
  border: css`
      ${({ type }) => type !== 'filled' && '1px solid currentColor'}
    `,
})}

  ${small({
  fontWeight: 400,
  padding: '0.7rem',
})}

  ${small({
  textTransform: 'capitalize',
})}

  &:hover {
    background-color: ${({ type, theme }) => type === 'filled' && theme.bgCartBtnHover};
    opacity: ${({ type }) => type === 'filled' && '0.8'};
  }
`;

const TopTexts = styled.div`
  ${mobile({ display: 'none' })}
`;

const TopText = styled.span`
  text-transform: capitalize;
  text-decoration: underline;
  font-size: 1.6rem;
  margin: 0 1rem;
  cursor: pointer;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;

  ${mobile({ flexDirection: 'column' })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;

  ${mobile({ flexDirection: 'column' })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 20rem;
  display: 'block';
  object-fit: cover;

  ${tab({ width: '15rem' })}

  ${mobile({ width: '10rem' })}

  ${smallest({
  width: '7rem',
  objectFit: 'contain',
})}
`;

const Details = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 1.8rem;

  ${laptop({ fontSize: '1.7rem' })}

  ${mobile({ fontSize: '1.4rem' })}
`;

const ProductName = styled.span`
  text-transform: uppercase;

  strong {
    text-transform: capitalize;
  }
`;

const ProductId = styled.span`
  text-transform: uppercase;

  strong {
    text-transform: uppercase;
  }
`;

const ProductColor = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: ${({ color }) => color};

  ${mobile({
  width: '1.75rem',
  height: '1.75rem',
})}
`;

const ProductSize = styled.span`
  text-transform: capitalize;
`;

const PriceDetail = styled.span`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const ProductButton = styled.button`
  border: none;
  display: inline-block;
  background-color: transparent;
  color: inherit;
`;

const ProductAmount = styled.div`
  font-size: 2.4rem;
  margin: 0.5rem;

  ${laptop({ fontSize: '2.2rem' })}

  ${mobile({
  fontSize: '2rem',
  margin: '0.5rem 1.5rem',
})}
`;

const ProductPrice = styled.div`
  font-size: 3rem;
  font-weight: 200;

  ${mobile({
  fontSize: '2.3rem',
  marginBottom: '2rem',
})}
`;

const Hr = styled.hr`
  background-color: ${({ theme }) => theme.hr};
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid ${({ theme }) => theme.borderSummary};
  border-radius: 1rem;
  padding: 2rem;
  height: 50vh;

  @media only screen and (max-width: 68.75em) {
    height: 100%;
  }
`;

const SummaryTitle = styled.h1`
  text-transform: uppercase;
  font-size: 3.2rem;
  font-weight: 200;

  ${laptop({ fontSize: '2.5rem' })}

  ${tab({ fontSize: '2rem' })}

  ${mobile({
  fontSize: '2.5rem',
  textAlign: 'center',
})}

  ${small({ fontSize: '2.3rem' })}
`;

const SummaryItem = styled.div`
  margin: 3rem 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${({ type }) => type === 'total' && '500'};
  font-size: ${({ type }) => (type === 'total' ? '2.4rem' : '1.6rem')};

  ${laptop({ margin: '2.5rem 0' })}

  ${tab({
  fontSize: css`
      ${({ type }) => (type === 'total' ? '2rem' : '1.48rem')}
    `,
})}

  ${mobile({
  margin: '2.7rem 0',
  fontSize: css`
      ${({ type }) => (type === 'total' ? '2.2rem' : '1.45rem')}
    `,
})}
`;

const SummaryItemText = styled.span`
  text-transform: capitalize;
`;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  border: none;
  width: 100%;
  padding: 1rem;
  display: inline-block;
  border-radius: 5px;
  text-transform: uppercase;
  background-color: ${({ theme }) => theme.bgCartBtn};
  color: ${({ theme }) => theme.textCartBtn};
  font-weight: 600;
  outline-color: ${({ theme }) => theme.text};
  cursor: pointer;
  transition: all 0.5s ease;

  &:hover {
    background-color: ${({ theme }) => theme.bgCartBtnHover};
    letter-spacing: 2px;
  }
`;

export default Cart;
