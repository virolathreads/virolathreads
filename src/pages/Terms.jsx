import Layout from "@/layouts/Layout";
import React from "react";

function Terms() {
  return (
    <Layout>
      <div
        style={{
          padding: "2rem",
          fontFamily: "Arial, sans-serif",
          lineHeight: "1.6",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          Terms of Service
        </h1>

        <section>
          <h2>Shipping and Deliveries</h2>
          <p>
            Virola Threads aims to get most orders dispatched within 7-15
            working days or sooner, subject to customers' specifications, stock,
            and availability of items.
          </p>
          <p>
            Please note that we require a contact number and email address for
            all shipments. If any information is missing, this could lead to
            delays in your order getting to you.
          </p>
          <p>
            We will contact you via email or phone if there is an unreasonable
            delay or if the items are out of stock.
          </p>
          <p>
            For local deliveries (within Lagos), we aim to deliver within the
            same day after the courier has picked up from our warehouse. This
            also depends on address and communication with the customer.
          </p>
          <p>
            For deliveries within Nigeria but outside Lagos, DHL aims to deliver
            within 1-3 working days picking up from our warehouse. This also
            depends on address and communication with the customer.
          </p>
          <p>
            We ship to all countries via DHL, and it could take between 3-5
            working days for delivery depending on the location.
          </p>
          <p>
            Based on the item delivery destination, some items will be shipped
            on a DDU (Delivery Duties Unpaid) basis, i.e., any duties and taxes
            incurred in the country of destination are the responsibility of the
            customer.
          </p>
          <p>
            If you for any reason refuse delivery, or are unavailable or unable
            to take the delivery despite reasonable attempts by the courier
            company, your item will be returned to Virola Threads, and you will
            be charged for the unpaid duties, taxes, and additional shipping
            costs.
          </p>
        </section>

        <section>
          <h2>Terms of Exchange / Returns / Refund</h2>
          <p>
            Virola Threads does not offer refunds; we only offer refunds for
            damaged merchandise. We value all our customers and want them to be
            100% satisfied with their purchases. To avoid any inconvenience or
            delays, we always recommend that our customers review the SIZING
            CHART in detail before making a purchase.
          </p>
          <p>
            However, if for any reason the purchased item does not fit well, you
            may email us at{" "}
            <a href="mailto:info@virolathreads.com">info@virolathreads.com</a>{" "}
            quoting your Order number and sizing issue within 1 week of
            receiving your order, and we can offer an exchange for FULL PRICE
            ITEMS ONLY. Kindly note that we do not offer refunds.
          </p>
          <p>
            Once we receive the said information, a customer service
            representative will contact you with size options. If the item is
            not available in stock, we shall suggest alternative items or offer
            a credit note that can be used on{" "}
            <a
              href="https://www.virolathreads.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.virolathreads.com
            </a>{" "}
            at any time within 6 months.
          </p>
          <p>
            If you are dissatisfied with your order for any reason, you can
            return your unused items for an exchange. Kindly note that we do not
            exchange items made to customers' specific measurements.
          </p>
          <p>
            All items on sale are final sale and cannot be exchanged or
            returned. We also do not make alterations. Depending on the
            situation, we may decide to help customers make alterations at an
            extra charge provided by one of our production team members.
          </p>
          <p>
            For all exchanges, items must be received at our store within 7
            working days of receipt of the package. Merchandise must not be
            worn, altered, or washed. Merchandise must include all the original
            packaging and garment tags still attached.
          </p>
          <p>
            Merchandise on Sale/Special Promotions may not be exchanged or
            refunded. We do not accept any item with any indication that it was
            used. In such cases, the item will be returned to the purchaser. It
            is advisable to send returned items by known courier companies like
            FedEx, DHL, or UPS and keep your proof of postage certificate, as we
            cannot be responsible for goods lost or damaged in transit.
          </p>
          <p>
            Please note that postal costs for returned goods are the customer’s
            responsibility and will be reimbursed by us only in the case of
            damaged, faulty, or incorrectly supplied goods.
          </p>
        </section>

        <section>
          <h2>Damaged Goods</h2>
          <p>
            Although we are very thorough in checking all items before they are
            dispatched, if you do receive a damaged item, please let us know by
            email at{" "}
            <a href="mailto:info@virolathreads.com">info@virolathreads.com</a>{" "}
            quoting your Order Number, the description of the damage, and, if
            possible, an image. Please note that any claim for damaged goods or
            missing items must be received within 2 business days of receipt of
            the package.
          </p>
          <p>
            Once we receive this request, a member of our team will contact you.
            Once your returned item is received and inspected, we will send you
            an email to notify you that we have received your returned item and
            notify you with a new estimated dispatch date of the replacement.
            You will not be charged for the shipping fee of the replacement
            item.
          </p>
          <p>
            If the item is not available in stock, we will provide a credit note
            that can be used on{" "}
            <a
              href="https://www.virolathreads.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.virolathreads.com
            </a>{" "}
            at any time within 6 months, or a refund will be processed.
          </p>
        </section>

        <section>
          <h2>Sales</h2>
          <p>
            Please note that during specific sales events, we do experience a
            high volume of orders, and your orders could take slightly longer to
            be sent out. Our processing time during sales events is 10-21
            working days.
          </p>
          <p>
            Sale orders are final sale. We offer no returns or exchanges and no
            alterations for sale orders.
          </p>
        </section>

        <section>
          <h2>Cancellation Policy</h2>
          <p>
            After a customer places an order online, it is final. We do not
            offer cancellations.
          </p>
        </section>
      </div>
    </Layout>
  );
}

export default Terms;
