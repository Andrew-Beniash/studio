
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const opportunities = [
  {
    area: "R&D Tax Credit",
    opportunity: "Potential to claim credits for qualifying research activities.",
    impact: "High",
    difficulty: "Medium",
    recommendation: "Conduct a study to identify and document all eligible R&D expenditures to maximize the claim.",
  },
  {
    area: "State Nexus",
    opportunity: "Review multi-state operations to ensure proper sales tax collection and remittance.",
    impact: "Medium",
    difficulty: "Low",
    recommendation: "Perform a nexus study to determine where the company has tax obligations and register if necessary.",
  },
  {
    area: "Depreciation",
    opportunity: "Accelerate depreciation on fixed assets using Section 179 or bonus depreciation.",
    impact: "Medium",
    difficulty: "Low",
    recommendation: "Analyze recent asset purchases to determine eligibility for accelerated depreciation methods.",
  },
];

const getImpactVariant = (impact: string) => {
  switch (impact.toLowerCase()) {
    case "high":
      return "destructive";
    case "medium":
      return "secondary";
    default:
      return "outline";
  }
};

export function OpportunityAnalysisContent() {
  return (
    <div className="mt-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Area</TableHead>
            <TableHead>Opportunity</TableHead>
            <TableHead>Impact</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>Recommendation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {opportunities.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.area}</TableCell>
              <TableCell>{item.opportunity}</TableCell>
              <TableCell>
                <Badge variant={getImpactVariant(item.impact)}>{item.impact}</Badge>
              </TableCell>
              <TableCell>{item.difficulty}</TableCell>
              <TableCell>{item.recommendation}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
