import { getIndustry, type IndustrySlug } from "@/content/industries";
import { getService, type ServiceSlug } from "@/content/services";
import { buildMetadata, serviceSchema } from "@/lib/seo";

export function serviceMetadata(slug: ServiceSlug) {
  const service = getService(slug);
  return buildMetadata({ title: service.seo.title, description: service.seo.description, path: service.href });
}

export function serviceJsonLd(slug: ServiceSlug) {
  const service = getService(slug);
  return serviceSchema({
    name: service.name,
    description: service.seo.description,
    path: service.href,
    serviceType: service.serviceType,
  });
}

export function industryMetadata(slug: IndustrySlug) {
  const industry = getIndustry(slug);
  return buildMetadata({ title: industry.seo.title, description: industry.seo.description, path: industry.href });
}

export function industryJsonLd(slug: IndustrySlug, serviceType: string) {
  const industry = getIndustry(slug);
  return serviceSchema({
    name: `Accounting & tax services for ${industry.name.toLowerCase()}`,
    description: industry.seo.description,
    path: industry.href,
    serviceType,
    audience: industry.audience,
  });
}
