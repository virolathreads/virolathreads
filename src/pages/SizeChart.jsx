import React from "react";
import "./size.css";
import { motion } from "framer-motion";
import Layout from "@/layouts/Layout";

const sizeData = {
  sizes: [
    { uk: 6, bust: 33, waist: 25.5, hip: 36 },
    { uk: 8, bust: 34, waist: 27, hip: 37.5 },
    { uk: 10, bust: 36, waist: 29.5, hip: 40 },
    { uk: 12, bust: 37, waist: 32, hip: 42 },
    { uk: 14, bust: 39, waist: 34, hip: 44.5 },
    { uk: 16, bust: 43, waist: 36, hip: 46 },
    { uk: 18, bust: 45, waist: 38.5, hip: 48.5 },
  ],
  conversion: {
    uk: [6, 8, 10, 12, 14, 16, 18],
    eu: [34, 36, 38, 40, 42, 44, 46],
    us: [2, 4, 6, 8, 10, 12, 14],
    au: [6, 8, 10, 12, 14, 16, 18],
  },
};

const SizeChart = () => {
  return (
    <Layout>
      <div className="size-chart">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h2
            style={{
              textAlign: "center",
              fontSize: "2.5rem",
              color: "#65867c",
              paddingTop: "3rem",
              fontWeight: "bold",
              marginBottom: "2rem",
            }}
          >
            SIZE GUIDE
          </motion.h2>
          <p>PLEASE NOTE THAT ALL OF OUR SIZES ARE UK SIZES</p>
          <p>VIROLA MEASUREMENT GUIDE</p>
        </motion.div>
        <h1 className="pt-5">Size Chart</h1>
        <table>
          <thead>
            <tr>
              <th>UK Size</th>
              <th>Bust (inches)</th>
              <th>Waist (inches)</th>
              <th>Hip (inches)</th>
            </tr>
          </thead>
          <tbody>
            {sizeData.sizes.map((row, index) => (
              <tr key={index}>
                <td>{row.uk}</td>
                <td>{row.bust}</td>
                <td>{row.waist}</td>
                <td>{row.hip}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2>Size Conversion</h2>
        <table>
          <tbody>
            <tr>
              <td>UK</td>
              {sizeData.conversion.uk.map((size, index) => (
                <td key={index}>{size}</td>
              ))}
            </tr>
            <tr>
              <td>EU</td>
              {sizeData.conversion.eu.map((size, index) => (
                <td key={index}>{size}</td>
              ))}
            </tr>
            <tr>
              <td>US</td>
              {sizeData.conversion.us.map((size, index) => (
                <td key={index}>{size}</td>
              ))}
            </tr>
            <tr>
              <td>AU</td>
              {sizeData.conversion.au.map((size, index) => (
                <td key={index}>{size}</td>
              ))}
            </tr>
          </tbody>
        </table>

        <h2> Conversion</h2>
        <table>
          <tbody>
            <tr>
              <td>XS</td>
              <td>UK 6</td>
            </tr>
            <tr>
              <td>S</td>
              <td>UK 8 - UK 10</td>
            </tr>
            <tr>
              <td>M</td>
              <td>UK 12 - UK 14</td>
            </tr>
            <tr>
              <td>L</td>
              <td>UK 16</td>
            </tr>
            <tr>
              <td>XL</td>
              <td>UK 18</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default SizeChart;
