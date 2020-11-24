import React, { Component } from "react";
import { Container, Jumbotron, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

class Home extends Component {

  constructor(props){
    super(props)
    this.state = {
      shippingdata: [],
    };
    console.log(this.props.location.idShipping.id);
  }

  componentDidMount() {
    axios
      .get(`https://shipping-sop.herokuapp.com/shipping/orderItem/description/${this.props.location.idShipping.id}/`)
      .then((res) => {
        const shippingdata = res.data;
        console.log(shippingdata)
        this.setState({ shippingdata });
      });
  }

  renderStatus = () => {
    return this.state.shippingdata.map((item) => {
      if (item.status == 'Ordered'){
        return(
          <ol class="progressbar progress--large" id="progressbar-res">
              <li class="is-complete" data-step="1">
                Ordered
              </li>
              <li class="progress__last" data-step="2">
                Ready
              </li>
              <li class="progress__last" data-step="3">
                Shipped
              </li>
              <li class="progress__last" data-step="4">
                Estimated delivery
              </li>
            </ol>
        )
      
      }else if(item.status == 'Shipped'){
        return(
          <ol class="progressbar progress--large" id="progressbar-res">
              <li class="is-complete" data-step="1">
                Ordered
              </li>
              <li class="is-complete" data-step="2">
                Ready
              </li>
              <li class="is-complete" data-step="3">
                Shipped
              </li>
              <li class="progress__last" data-step="4">
                Estimated delivery
              </li>
            </ol>
        )
      }else if(item.status == 'Ready'){
        return(
          <ol class="progressbar progress--large" id="progressbar-res">
            <li class="is-complete" data-step="1">
              Ordered
            </li>
            <li class="is-complete" data-step="2">
              Ready
            </li>
            <li class="progress__last" data-step="3">
              Shipped
            </li>
            <li class="progress__last" data-step="4">
              Estimated delivery
            </li>
          </ol>
        )
      }
      else{
        return(
          <ol class="progressbar progress--large" id="progressbar-res">
            <li class="is-complete" data-step="1">
              Ordered
            </li>
            <li class="is-complete" data-step="2">
              Ready
            </li>
            <li class="is-complete" data-step="3">
              Shipped
            </li>
            <li class="is-complete" data-step="4">
              Estimated delivery
            </li>
          </ol>
        )
      }
    })
  }


  render() {
    return (
      <div>
        <div id="bg" />
        <Container>
          <header class="my-5 text-center">
            <span class="h1 font-weight-bolder">Shipping</span>
          </header>

          <section name="progress-barr" class="my-5">
            {this.renderStatus()}
          </section>

          <Jumbotron className="bg-white">
            <span
              class="font-weight-bold mb-5 float-left text-uppercase"
              style={{ fontSize: 30 }}
            >
              Details
            </span>
            <section name="contents" class="size-l">
              <Table striped bordered hover class="table table-striped">
                <thead>
                  <tr style={{ fontSize: 25 }}>
                    <th scope="col">Date</th>
                    <th scope="col">Description</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.shippingdata.map((person) => (
                    <tr className="font-weight-light" style={{ fontSize: 20 }}>
                      <th className="font-weight-light">
                        {person.timestamp}
                      </th>
                      <td className="font-weight-light">{person.description}</td>
                      <td className="font-weight-light">{person.status}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Link to="/">
                <Button className="my-4" variant="primary" size="lg" block>
                  Back
                </Button>
              </Link>
            </section>
          </Jumbotron>
        </Container>
      </div>
    );
  }
}

export default Home;
