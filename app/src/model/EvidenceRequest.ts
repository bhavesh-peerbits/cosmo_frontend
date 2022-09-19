interface EvidenceRequest {
	id: number;
	name: string;
	type: string;
	workflowtype: string;
	applications: { name: string }[];
	status: string;
}

export default EvidenceRequest;
