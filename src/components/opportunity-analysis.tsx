
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, AlertTriangle, Clock } from "lucide-react";

const Section = ({ title, children, value, className }: { title: string, children: React.ReactNode, value: string, className?: string }) => (
  <AccordionItem value={value} className={cn("border-t border-black/5", className)}>
    <AccordionTrigger className="py-4 text-[10px] font-semibold tracking-wider uppercase text-black/40 hover:no-underline">
      {title}
    </AccordionTrigger>
    <AccordionContent>
      <div className="space-y-2 text-sm text-black/80 pb-4">
        {children}
      </div>
    </AccordionContent>
  </AccordionItem>
);

const InfoRow = ({ label, value }: { label: string, value: React.ReactNode }) => (
  <div className="flex justify-between items-center">
    <span className="font-medium">{label}</span>
    <span className="text-right">{value}</span>
  </div>
);

const getRiskVariant = (risk: string) => {
  switch (risk.toLowerCase()) {
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
    <div className="space-y-1 pt-4">
      <Accordion type="multiple" defaultValue={["item-1", "item-5"]} className="w-full">
        <Section title="Opportunity Summary" value="item-1">
          <InfoRow label="Client / Industry / Region" value="ABC Consulting LLC / Hospitality / West" />
          <InfoRow label="Opportunity Owner" value="James T. Kirk" />
          <InfoRow label="Engagement Start / Duration" value="2025-01-15 / 6 weeks" />
          <p className="pt-2 text-xs text-black/60">
            Analysis of state and local tax positions to identify potential refund opportunities and ensure compliance following recent acquisitions.
          </p>
        </Section>

        <Section title="Financial Metrics" value="item-2">
          <InfoRow label="Projected Revenue" value="$75,000" />
          <InfoRow label="Estimated Margin / Gross Profit" value="45% / $33,750" />
          <InfoRow label="Resource Demand (Hours)" value="120 Hours (2 Sr, 1 Mgr)" />
          <div className="pt-2 text-xs text-blue-500 bg-blue-50 p-2 rounded-md">
            <strong>AI Insight:</strong> Margin risk is low based on similar prior engagements. Projected capacity is clear for Q1.
          </div>
        </Section>

        <Section title="Risk & Feasibility Indicators" value="item-3">
          <InfoRow label="Client Acceptance Status" value={<Badge className="bg-green-100 text-green-800">Approved</Badge>} />
          <InfoRow label="Project Acceptance" value="Auto-Evaluated: Passed" />
          <InfoRow label="Data Availability" value="85% Received" />
          <InfoRow label="Regulatory Complexity" value="Medium" />
          <div className="pt-2 text-xs text-orange-500 bg-orange-50 p-2 rounded-md">
            <strong>AI Risk Summary:</strong> Potential data gaps in newly acquired entities may delay analysis.
          </div>
        </Section>

        <Section title="Strategic Fit / Cross-Sell Potential" value="item-4">
          <InfoRow label="Related Services Identified" value="Transfer Pricing, R&D Credits" />
          <InfoRow label="Client Relationship Health" value="Strong" />
          <InfoRow label="Firm Priority Alignment" value="Strategic Account" />
          <InfoRow label="Historical Conversion Rate" value="92% (AI-Derived)" />
        </Section>

        <Section title="Recommended Actions" value="item-5" className="border-b-0">
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="font-semibold text-sm">Suggested Next Step:</p>
            <p className="text-sm">Schedule scoping call with SALT team and add Credits & Incentives review to the proposal.</p>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" size="sm">
              <Clock className="w-4 h-4 mr-1" />
              Defer / Await Data
            </Button>
            <Button variant="secondary" size="sm">
              <AlertTriangle className="w-4 h-4 mr-1" />
              Flag for Review
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-[#78BE20] to-[#00A9CE] text-white">
              <Check className="w-4 h-4 mr-1" />
              Proceed
            </Button>
          </div>
        </Section>
      </Accordion>
    </div>
  );
}
