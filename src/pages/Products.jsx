import styled from 'styled-components';

import { products } from 'data';
import Product from 'components/Product';

const Products = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Form>
            <FormGroup>
              <Label htmlFor='categories'>Categories</Label>
              <Select id='categories' name='categories'>
                <Option value='women'>Women</Option>
                <Option value='men'>Men</Option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label htmlFor='size'>Size</Label>
              <Select id='size' name='size'>
                <Option value='M'>M</Option>
                <Option value='L'>L</Option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label htmlFor='color'>Color</Label>
              <Select id='color' name='color'>
                <Option value='black'>Black</Option>
                <Option value='red'>Red</Option>
              </Select>
            </FormGroup>
          </Form>
        </Left>
        <Right>
          {products.map((item) => {
            return <Product key={item._id} {...item} />
          })}
        </Right>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  display: flex;
`;

const Left = styled.div`
  flex: 1;
  padding: 3rem;
  background-color: yellowgreen;
`;

const Form = styled.form`

`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &:not(:last-of-type) {
    margin-bottom: 2rem;
  }
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 1.4rem;
`;

const Select = styled.select`

`;

const Option = styled.option`

`;

const Right = styled.div`
  flex: 3;
  display: flex;
  flex-wrap: wrap;
  padding: 3rem;
`;

export default Products;
