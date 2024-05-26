// Helpers for Deno compatibility
declare const Deno: any;
const isDeno = typeof Deno !== 'undefined' && Deno?.version?.deno;

export function cwd() {
	if (isDeno) {
		return Deno.cwd();
	}

	// @ts-ignore
	return process.cwd();
}
