// oxlint-disable typescript/consistent-type-imports typescript/no-explicit-any typescript/no-empty-object-type typescript/no-empty-interface
/// <reference types='codeceptjs' />
type steps_file = typeof import("./steps_file.js");

declare namespace CodeceptJS {
	interface SupportObject {
		I: I;
		current: any;
	}
	interface Methods extends Playwright {}
	interface I extends ReturnType<steps_file> {}
	namespace Translation {
		interface Actions {}
	}
}
