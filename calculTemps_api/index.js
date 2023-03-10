import soap from "soap";
import http from "http";
import express from "express";
import cors from "cors";
import { readFileSync } from "fs";

const service = {
  DistanceService: {
    DistanceServiceSoapPort: {
      distance: function (args) {
        const distance = args.distance;
        const autonomie = args.autonomie;
        const tempschargement = args.tempschargement;
        const vitesse = 130;

        const nbRecharge = distance / autonomie;
        console.log(nbRecharge);
        if (nbRecharge > 1) {
          const tempsRecharge = nbRecharge * tempschargement;
          const result = (distance + tempsRecharge) / vitesse;
          return { distanceResult: result };
        } else {
          const result = distance / vitesse;
          return { distanceResult: result };
        }
      },
    },
  },
};

const wsdl = `
<definitions name="DistanceService" targetNamespace="https://cout-backend-projet-ellon.vercel.app/distance?wsdl" 
  xmlns="http://schemas.xmlsoap.org/wsdl/" 
  xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" 
  xmlns:tns="https://cout-backend-projet-ellon.vercel.app/distance?wsdl" 
  xmlns:xsd="http://www.w3.org/2001/XMLSchema">

  <message name="distance">
    <part name="distance" type="xsd:int"/>
    <part name="autonomie" type="xsd:int"/>
    <part name="tempschargement" type="xsd:int"/>
  </message>

  <message name="distanceResponse">
    <part name="distanceResult" type="xsd:int"/>
  </message>

  <portType name="DistanceServiceSoapPort">
    <operation name="distance">
      <input message="tns:distance"/>
      <output message="tns:distanceResponse"/>
    </operation>
  </portType>

  <binding name="DistanceServiceSoapPort" type="tns:DistanceServiceSoapPort">
    <soap:binding style="rpc" transport="http://schemas.xmlsoap.org/soap/http"/>
    <operation name="distance">
      <soap:operation soapAction="distance"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
  </binding>

  <service name="DistanceService">
    <port binding="tns:DistanceServiceSoapPort" name="DistanceServiceSoapPort">
      <soap:address location="https://cout-backend-projet-ellon.vercel.app/distance?wsdl" />
    </port>
  </service>
</definitions>
`;


const app = express();

app.use(cors());

soap.listen(app, "/distance", service, wsdl);

const port = 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

